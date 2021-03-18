using Hahn.ApplicatonProcess.February2021.Domain.Models;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.February2021.Domain.IRepository
{
    public interface IAssetRepository : IRepository<Asset>
    {
        new Task<int> Save(Asset asset);
    }
}
