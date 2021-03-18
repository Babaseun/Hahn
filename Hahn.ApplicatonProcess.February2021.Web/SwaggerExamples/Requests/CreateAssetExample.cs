using Hahn.ApplicatonProcess.February2021.Domain.Models;
using Swashbuckle.AspNetCore.Filters;
using System;

namespace Hahn.ApplicatonProcess.February2021.Web.SwaggerExamples.Requests
{
	public class CreateAssetExample : IExamplesProvider<Asset>
	 {
		  public Asset GetExamples()
		  {
				return new Asset()
				{
					AssetName = "Car",
                    Broken = true,
                    CountryOfDepartment = "Germany",
                    Department = 0,
                    EmailAddressOfDepartment = "germany@gmail.com",
                    PurchaseDate = DateTime.UtcNow
				};
		  }
	 }
}
