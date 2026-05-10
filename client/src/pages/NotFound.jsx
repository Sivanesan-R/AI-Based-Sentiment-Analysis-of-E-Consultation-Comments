import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-gradient-brand rounded-lg flex items-center justify-center text-foreground font-bold text-4xl shadow-brand mx-auto">
          Z
        </div>
        
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <Button asChild className="bg-gradient-brand hover:bg-brand-red-hover shadow-brand">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="border-border hover:bg-surface-hover text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>Requested path: <code className="bg-surface-elevated px-2 py-1 rounded text-primary">{location.pathname}</code></p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;