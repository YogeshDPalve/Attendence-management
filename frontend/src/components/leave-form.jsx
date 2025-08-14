import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import FileUpload from "./file-upload";

export function LeaveForm({ className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <Card className="md:px-4 shadow-lg">
        <CardHeader>
          <CardTitle className="md:text-2xl text-xl text-primary font-bold">
            Leave Application
          </CardTitle>
          <CardDescription className="text-muted">
            Request leave by specifying reason and duration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid md:grid-cols-2 gap-5 mb-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Name</Label>
                </div>
                <Input id="name" type="text" required placeholder="Your name" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="trainer">Trainer</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your trainer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="apple">Ptariska mam</SelectItem>
                      <SelectItem value="banana">Rutuja mam</SelectItem>
                      <SelectItem value="blueberry">Varsha mam</SelectItem>
                      <SelectItem value="grapes">Amol sir</SelectItem>
                      <SelectItem value="pineapple">Shreya mam</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="trainer">Leave Type</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="apple">Medical Leave</SelectItem>
                      <SelectItem value="banana">Functional Leave</SelectItem>
                      <SelectItem value="blueberry">Emergency Leave</SelectItem>
                      <SelectItem value="grapes">Exam Leave</SelectItem>
                      <SelectItem value="pineapple">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>         
              </div>
              {/* <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Reason</Label>
                </div>
                <Input
                  id="leave-type"
                  type="text"
                  required
                  placeholder="Reason for leave"
                />
              </div> */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center  ">
                  <Label htmlFor="text">
                    Duration<span className="font-normal">(days)</span>
                  </Label>
                </div>
                <Input
                  id="duration"
                  type="number"
                  required
                  placeholder="Duration in days"
                />
              </div>
              <div className="flex flex-col gap-2 col-span-2">
                <Label htmlFor="email">Attachements</Label>
                <FileUpload />
              </div>
              <div className="flex flex-col gap-2 col-span-2">
                <Label htmlFor="email">Description</Label>
                <Textarea
                  id="reason"
                  type="text"
                  placeholder="Provide detailed description..."
                  required
                />
              </div>
            </div>

            <div>
              {/* <SlideButton /> */}
              <Button type="submit" className="w-50 text-gray-100 shadow-md">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
