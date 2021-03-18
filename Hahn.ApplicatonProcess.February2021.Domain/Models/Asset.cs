using System;
using System.Text.Json.Serialization;

namespace Hahn.ApplicatonProcess.February2021.Domain.Models
{
	public class Asset
	 {
		  [JsonIgnore]
		  public int Id { get; set; }
		  public string AssetName { get; set; }
		  public Department Department { get; set; }
		  public string CountryOfDepartment { get; set; }
		  public string EmailAddressOfDepartment { get; set; }
		  public DateTime PurchaseDate { get; set; }
		  public bool Broken { get; set; } = false;

	 }
}
