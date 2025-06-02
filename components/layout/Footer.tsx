import { Mail, Phone, Film } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-indigo-700 text-[#FAFAFA] py-10 ">
      <div className="container mx-auto px-4 h-auto md:h-[200px] flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 stroke-1" />
            <h3 className="font-bold italic text-base">Movie Z</h3>
          </div>
          <p className="font-normal text-sm">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>

        <div className="flex flex-col">
          <h3 className="font-normal text-base mb-4">Contact Information</h3>

          <div className="flex flex-col gap-6">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-3" />
              <div className="text-sm">
                <p className="font-medium">Email:</p>
                <p className="font-normal">support@moviez.com</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-3" />
              <div className="text-sm">
                <p className="font-medium">Phone:</p>
                <p className="font-normal">+976 (11) 123-4567</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <h3 className="font-normal">Follow us</h3>
          <div className="flex flex-wrap gap-3 font-medium">
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
            <p>Youtube</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
