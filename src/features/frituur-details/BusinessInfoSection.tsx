
import { Frituur } from "@/types";
import { Clock, Map, Phone, Mail, Globe, Instagram, Facebook, Linkedin } from "lucide-react";

interface BusinessInfoSectionProps {
  frituur: Frituur;
}

const BusinessInfoSection = ({ frituur }: BusinessInfoSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 space-y-4">
      <h2 className="font-semibold text-lg border-b pb-2">Location & Contact</h2>
      
      {/* Address */}
      {(frituur.Straat || frituur.Gemeente) && (
        <div className="flex items-start">
          <Map className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            {frituur.Straat && <p>{frituur.Straat}</p>}
            <p>
              {frituur.Gemeente}
              {frituur.Postcode && ` - ${frituur.Postcode}`}
            </p>
            <p className="text-sm text-gray-500">{frituur.Provincie}</p>
          </div>
        </div>
      )}
      
      {/* Phone number */}
      {frituur.Number && (
        <div className="flex items-start">
          <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium">Phone</p>
            <a 
              href={`tel:${frituur.Number}`}
              className="text-primary hover:underline"
            >
              {frituur.Number}
            </a>
          </div>
        </div>
      )}
      
      {/* Email */}
      {frituur.Email && (
        <div className="flex items-start">
          <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium">Email</p>
            <a 
              href={`mailto:${frituur.Email}`}
              className="text-primary hover:underline break-all"
            >
              {frituur.Email}
            </a>
          </div>
        </div>
      )}
      
      {/* Opening hours */}
      {frituur["Open & Close Time"] && (
        <div className="flex items-start">
          <Clock className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium">Opening Hours</p>
            <p className="text-gray-600">{frituur["Open & Close Time"]}</p>
          </div>
        </div>
      )}
      
      {/* Website */}
      {frituur.Website && (
        <div className="flex items-start">
          <Globe className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium">Website</p>
            <a 
              href={frituur.Website.startsWith('http') ? frituur.Website : `https://${frituur.Website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline break-all"
            >
              {frituur.Website}
            </a>
          </div>
        </div>
      )}
      
      {/* Social Media */}
      <div className="space-y-3">
        {frituur["Instagram link"] && (
          <div className="flex items-start">
            <Instagram className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium">Instagram</p>
              <a 
                href={frituur["Instagram link"]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline break-all"
              >
                {frituur["Instagram link"]}
              </a>
            </div>
          </div>
        )}
        
        {frituur["Facebook Link"] && (
          <div className="flex items-start">
            <Facebook className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium">Facebook</p>
              <a 
                href={frituur["Facebook Link"]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline break-all"
              >
                {frituur["Facebook Link"]}
              </a>
            </div>
          </div>
        )}
        
        {frituur["Linkedin Link"] && (
          <div className="flex items-start">
            <Linkedin className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium">LinkedIn</p>
              <a 
                href={frituur["Linkedin Link"]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline break-all"
              >
                {frituur["Linkedin Link"]}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessInfoSection;
