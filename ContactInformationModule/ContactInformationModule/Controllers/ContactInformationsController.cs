using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using ContactInformationBLL;
using ContactInformationAPIModel;

namespace ContactInformationModule.Controllers
{
    public class ContactInformationsController : ApiController
    {
        private ContactInformationDetails db = new ContactInformationDetails();

        public List<ContactInformation> GetContactInformations()
        {
            return db.ShowDetails();
        }

        public IHttpActionResult GetContactInformation(int id)
        {
            ContactInformation contactInformation = db.GetById(id);
            if (contactInformation == null)
            {
                return NotFound();
            }

            return Ok(contactInformation);
        }

        public IHttpActionResult PutContactInformation(ContactInformation contactInformation)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.UpdateChanges(contactInformation);
            }
            catch (DbUpdateConcurrencyException)
            {               
               throw;           
            }

            return Ok(contactInformation);
        }

        public IHttpActionResult PostContactInformation(ContactInformation contactInformation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            db.SaveChanges(contactInformation);

            return CreatedAtRoute("DefaultApi", new { id = contactInformation.ContactId }, contactInformation);
        }

        public IHttpActionResult DeleteContactInformation(int id)
        {
            ContactInformation contactInformation = db.GetById(id);
            if (contactInformation == null)
            {
                return NotFound();
            }

            db.DeleteDetails(id);

            return Ok(contactInformation);
        }       
    }
}