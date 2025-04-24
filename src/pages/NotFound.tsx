
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-2xl font-semibold mb-6">Page not found</p>
        <p className="text-muted-foreground mb-8">
          The requested healthcare resource could not be found. Please contact your system administrator if you believe this is an error.
        </p>
        <Button asChild size="lg">
          <Link to="/">Return to RCM Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
