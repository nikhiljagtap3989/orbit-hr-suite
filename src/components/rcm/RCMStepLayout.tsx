
import React from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface RCMStepLayoutProps {
  title: string;
  description: string;
  stepNumber: number;
  icon: LucideIcon;
  children: React.ReactNode;
  previousStep?: { name: string; path: string };
  nextStep?: { name: string; path: string };
}

const RCMStepLayout = ({
  title,
  description,
  stepNumber,
  icon: Icon,
  children,
  previousStep,
  nextStep
}: RCMStepLayoutProps) => {
  return (
    <div className="container mx-auto space-y-6">
      <div className="flex items-center space-x-4 mb-2">
        <div className="h-12 w-12 rounded-full bg-amber-400 flex items-center justify-center">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <span className="text-muted-foreground">Step {stepNumber}:</span> {title}
          </h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      
      <Card className="p-6">
        {children}
      </Card>

      <div className="flex justify-between pt-4">
        {previousStep ? (
          <Button variant="outline" asChild>
            <Link to={previousStep.path}>← {previousStep.name}</Link>
          </Button>
        ) : (
          <div></div>
        )}
        
        <Button variant="default" asChild>
          <Link to="/">RCM Dashboard</Link>
        </Button>
        
        {nextStep ? (
          <Button variant="outline" asChild>
            <Link to={nextStep.path}>{nextStep.name} →</Link>
          </Button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default RCMStepLayout;
