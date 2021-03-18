using Hahn.ApplicatonProcess.February2021.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Hahn.ApplicatonProcess.February2021.Data
{
	public class AssetContext : DbContext
	 {
		  public DbSet<Asset> Assets { get; set; }

		  public AssetContext(DbContextOptions<AssetContext> options) : base(options) { }

	 }

}
