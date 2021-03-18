using Hahn.ApplicatonProcess.February2021.Domain.IRepository;
using Hahn.ApplicatonProcess.February2021.Domain.Models;
using Hahn.ApplicatonProcess.February2021.Domain.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.February2021.Web.Controllers
{
	[Route("api/[controller]")]
	 [ApiController]
	 public class AssetController : ControllerBase
	 {
		  private readonly IAssetRepository _assetRepository;

		  public AssetController(IAssetRepository assetRepository)
		  {
				_assetRepository = assetRepository;
		  }
			 /// <summary>
			 /// Adds an asset to the database
			 /// </summary>
			 /// <param name="asset"></param>
			 /// <returns></returns>

		  [HttpPost]
		  public async Task<IActionResult> Post(Asset asset)
		  {
				var service = new AssetService(_assetRepository);
				var response = await service.SaveAsset(asset);
				return Created(new Uri($"{Request.Path}/{response}", UriKind.Relative), asset);
		  }
		/// <summary>
		/// Retrieves an asset by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
          [HttpGet("{id}")]
		  public async Task<IActionResult> GetById(int id)
		  {
				var service = new AssetService(_assetRepository);
				var response = await service.GetAsset(id);
				if (!response.Success) return BadRequest(response.Message);
				return Ok(response.Data);
		  }
		  /// <summary>
		  /// Updates an asset by Id
		  /// </summary>
		  /// <param name="id"></param>
		  /// <param name="asset"></param>
		  /// <returns></returns>
		  [HttpPut("{id}")]
		  public async Task<IActionResult> Put(int id, Asset asset)
		  {
				var service = new AssetService(_assetRepository);
				var response = await service.UpdateAsset(id, asset);

				if (!response.Success) return BadRequest(response.Message);
				return Ok(response.Data);
		  }
			 /// <summary>
			 /// Deletes an asset by Id
			 /// </summary>
			 /// <param name="id"></param>
			 /// <returns></returns>
		  [HttpDelete("{id}")]
		  public async Task<IActionResult> Delete(int id)
		  {
				var service = new AssetService(_assetRepository);
				var response = await service.DeleteAsset(id);

				if (!response.Success) return BadRequest(response.Message);
				return Ok(response.Data);
		  }
				 /// <summary>
				 /// Returns a list of assets and also a functionality for
				 /// returning paginated results
				 /// </summary>
				 /// <param name="pageNumber"></param>
				 /// <param name="perPage"></param>
				 /// <returns></returns>
          [HttpGet]
          public async Task<IActionResult> GetAll(int pageNumber = 1, int perPage = 6)
          {
              if (pageNumber <= 0)
              {
                  return BadRequest(new { message = $"Page number {pageNumber} is invalid " });
              }
              var assetService = new AssetService(_assetRepository);
              var assets = await assetService.GetAllAssets(pageNumber, perPage);


              return assets.Count == 0 ? Ok(new { message = "No assets in the database" }) : Ok(assets);
          }
	}
}
