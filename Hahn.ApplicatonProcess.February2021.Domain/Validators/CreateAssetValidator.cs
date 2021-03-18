using FluentValidation;
using Hahn.ApplicatonProcess.February2021.Domain.Models;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.February2021.Domain.Validators
{
	public class CreateAssetValidator : AbstractValidator<Asset>
	 {
		  public CreateAssetValidator()
		  {
				RuleFor(a => a.AssetName)
					 .MinimumLength(5);
				RuleFor(a => a.Department)
					 .IsInEnum();
				RuleFor(a => a.CountryOfDepartment)
					 .MustAsync(async (country, cancellation) =>
						  (await BeAValidCountryName(country))).WithMessage("Country name is not valid.");
				RuleFor(a => a.PurchaseDate)
					 .Must((asset, date) => DateTime.UtcNow.Year - date.Year != 1)
					 .WithMessage("PurchaseDate must not be older then one year");
				RuleFor(a => a.EmailAddressOfDepartment)
					 .Matches(@"^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4};?)+$")
							.WithMessage("Email address of country is not valid."); ;
				RuleFor(a => a.Broken)
					 .NotNull();
		  }
		  private static async Task<bool> BeAValidCountryName(string countryName)
		  {
				using var client = new HttpClient();
				var url = $"https://restcountries.eu/rest/v2/name/{countryName}?fullText=true";
				var jsonResponse = await client.GetAsync(url);
				client.Dispose();
				return jsonResponse.IsSuccessStatusCode;
		  }
	 }
}
