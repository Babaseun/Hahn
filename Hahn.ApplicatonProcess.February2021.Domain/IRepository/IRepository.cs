using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.February2021.Domain.IRepository
{
    public interface IRepository<T>
    {
        Task<IEnumerable<T>> FindAll();
        Task<T> Find(int? id);
        Task Update(T t);
        Task Save(T t);
        Task Delete(int? id);
        Task<bool> Exist(int? id);
        Task<int> Count();
        Task AddRange(object[] t);
    }
}
