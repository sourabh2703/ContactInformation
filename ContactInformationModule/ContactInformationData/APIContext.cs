using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ContactInformationAPIModel;

namespace ContactInformationData
{
    public class APIContext : DbContext
    {
        public APIContext() : base("ContactInfoEntities")
        {

        }
        public DbSet<ContactInformation> ContactInformations { get; set; }        
    }
}
