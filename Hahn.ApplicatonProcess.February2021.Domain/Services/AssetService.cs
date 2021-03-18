using Hahn.ApplicatonProcess.February2021.Domain.IRepository;
using Hahn.ApplicatonProcess.February2021.Domain.IServices;
using Hahn.ApplicatonProcess.February2021.Domain.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.February2021.Domain.Services
{
	public class AssetService : IAssetService
	 {
		  private readonly IAssetRepository _assetRepository;

		  public AssetService(IAssetRepository assetRepository)
		  {
				_assetRepository = assetRepository;
		  }
		  public async Task<int> SaveAsset(Asset asset)
		  {
				return await _assetRepository.Save(asset);
		  } 
          public async Task<Response<Asset>> GetAsset(int id)
		  {
				var response = new Response<Asset>();
				var asset = await _assetRepository.Find(id);
			    
				if (asset is null)
				{
					 response.Message = $"Asset with Id {id} does not exists";
					 return response;
				}

				response.Success = true;
				response.Data = asset;
				return response;
		  }
		  public async Task<Response<Asset>> UpdateAsset(int id, Asset model)
		  {
				var response = new Response<Asset>();
				var asset = await _assetRepository.Find(id);

				if (asset is null)
				{
					 response.Message = $"Asset with Id {id} does not exists";
					 return response;
				}
				asset.Department = model.Department;
				asset.AssetName = model.AssetName;
				asset.Broken = model.Broken;
				asset.CountryOfDepartment = model.CountryOfDepartment;
				asset.PurchaseDate = model.PurchaseDate;
				asset.EmailAddressOfDepartment = model.EmailAddressOfDepartment;

				await _assetRepository.Update(asset);
				response.Success = true;
				response.Data = asset;
				return response;
		  } 
		  public async Task<Response<string>> DeleteAsset(int id)
		  {
				var response = new Response<string>();
				var asset = await _assetRepository.Find(id);

				if (asset is null)
				{
					 response.Message = $"Asset with Id {id} does not exists";
					 return response;
				}
				await _assetRepository.Delete(id);
				response.Success = true;
				response.Message = $"Asset with Id {id} has been deleted successfully";
				return response;
		  }
			 public async Task<PaginatedResponseDto<IEnumerable<Asset>>> GetAllAssets(int pageNumber, int perPage)
			 {
				  var assets = await _assetRepository.FindAll();

				  var count = await _assetRepository.Count();
				  return new PaginatedResponseDto<IEnumerable<Asset>>()
				  {
						Name = "Applicants",
						Count = count,
						Data = assets.OrderByDescending(x => x.Id).Skip((pageNumber - 1) * perPage).Take(perPage),
						PageNumber = pageNumber,
						PerPage = perPage
				  };
			 }
	}
}
