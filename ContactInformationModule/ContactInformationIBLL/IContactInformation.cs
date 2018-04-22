using System.Collections.Generic;
using ContactInformationAPIModel;
namespace ContactInformationIBLL
{
    public interface IContactInformation
    {
        void SaveChanges(ContactInformation contactInformation);
        void UpdateChanges(ContactInformation contactInformation);
        List<ContactInformation> ShowDetails();
        void DeleteDetails(int id);
        ContactInformation GetById(int id);
    }
}
