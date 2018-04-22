using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using ContactInformationAPIModel;
using ContactInformationData;
using ContactInformationIBLL;

namespace ContactInformationBLL
{
    public class ContactInformationDetails : IContactInformation
    {
        APIContext _webcontext = new APIContext();

        public void DeleteDetails(int id)
        {
            var Info = _webcontext.ContactInformations.Where(m => m.ContactId == id).FirstOrDefault();
            _webcontext.ContactInformations.Remove(Info);
            _webcontext.SaveChanges();
                
        }

        public void SaveChanges(ContactInformation contactInformation)
        {
            _webcontext.ContactInformations.Add(contactInformation);
            _webcontext.SaveChanges();            
        }

        public void UpdateChanges(ContactInformation contactInformation)
        {
            _webcontext.Entry(contactInformation).State = EntityState.Modified;
           
            _webcontext.SaveChanges();
        }

        public List<ContactInformation> ShowDetails()
        {
            List<ContactInformation> contactInformationList = new List<ContactInformation>();
            var details = _webcontext.ContactInformations.ToList();
            if (details != null)
            {
                Parallel.ForEach(details, x =>
                {
                    ContactInformation contactInfo = new ContactInformation();
                    contactInfo.ContactId = x.ContactId;
                    contactInfo.FirstName = x.FirstName;
                    contactInfo.LastName = x.LastName;
                    contactInfo.Email = x.Email;
                    contactInfo.PhoneNumber = x.PhoneNumber;
                    contactInformationList.Add(contactInfo);

                });
                return contactInformationList;
            }
            else
            {
                return contactInformationList;
            }
        }        

        public ContactInformation GetById(int id)
        {
            return _webcontext.ContactInformations.Find(id);
        }
      
    }
}
