export function Footer() {
  return (
    <footer className="border-t bg-muted/40 pb-12 pt-16">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <h3 className="text-lg font-bold mb-4">Pharmetix</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
              Your one-stop destination for all your healthcare needs. We
              provide genuine medicines, expert advice, and fast delivery.
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium">Contact Us</p>
              <p className="text-sm text-muted-foreground">
                support@pharmetix.com
              </p>
              <p className="text-sm text-muted-foreground">+880 1234 567890</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Return Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Download App</h3>
            <div className="flex flex-col gap-3">
              <div className="h-10 w-32 bg-black/80 rounded-md flex items-center justify-center text-white text-xs">
                App Store
              </div>
              <div className="h-10 w-32 bg-black/80 rounded-md flex items-center justify-center text-white text-xs">
                Google Play
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Pharmetix. All rights reserved.
          </p>
          <div className="flex gap-4">{/* Social icons would go here */}</div>
        </div>
      </div>
    </footer>
  );
}
