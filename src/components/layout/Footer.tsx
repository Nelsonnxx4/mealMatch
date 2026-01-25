import {
  UtensilsCrossed,
  Mail,
  Twitter,
  Instagram,
  Facebook,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-heading font-bold">mealMatch</span>
            </div>
            <p className="text-primary-foreground/60 text-sm">
              Your personal food recommendation companion for African cuisine.
              Solving food indecision, one meal at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li>
                <a
                  className="hover:text-primary-foreground transition-colors"
                  href="#howItWorks"
                >
                  How it Works
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary-foreground transition-colors"
                  href="#budget"
                >
                  Budget Tiers
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary-foreground transition-colors"
                  href="#countries"
                >
                  Countries
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary-foreground transition-colors"
                  href="#pricing"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          {/* <div>
            <h4 className="font-heading font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li>
                <a
                  className="hover:text-primary-foreground transition-colors"
                  href="#"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary-foreground transition-colors"
                  href="#"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary-foreground transition-colors"
                  href="#"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary-foreground transition-colors"
                  href="#"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div> */}

          {/* Newsletter */}
          {/* <div>
            <h4 className="font-heading font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-primary-foreground/60 mb-4">
              Get the latest food recommendations and tips delivered to your
              inbox.
            </p>
            <div className="flex gap-2">
              <input
                className="flex-1 px-4 py-2 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:border-primary-foreground/50"
                placeholder="Enter your email"
                type="email"
              />
              <button className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © 2025 ChopWise. Made with ❤️ for Africa.
          </p>
          {/* <div className="flex gap-4">
            <a
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              href="#"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              href="#"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              href="#"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
