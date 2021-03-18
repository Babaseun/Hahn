using Hahn.ApplicatonProcess.February2021.Domain.IRepository;
using Hahn.ApplicatonProcess.February2021.Domain.Models;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.February2021.Data.Repositories
{
    public class AssetRepository : BaseRepository<Asset>, IAssetRepository
    {
        private readonly AssetContext _ctx;

        public AssetRepository(AssetContext ctx) : base(ctx)
        {
            _ctx = ctx;
        }
        public override async Task<int> Save(Asset asset)
        {
            await _ctx.Assets.AddAsync(asset);
            await _ctx.SaveChangesAsync();
            return asset.Id;
        }
    }
}
