using Hahn.ApplicatonProcess.February2021.Domain.Models;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.February2021.Domain.IServices
{
    public interface IAssetService
    {
        Task<int> SaveAsset(Asset asset);
    }
}
