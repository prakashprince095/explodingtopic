import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function SignupSection() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Sign Up Now</CardTitle>
            <CardDescription>Get exclusive access to startup insights and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="space-y-4">
                <Input type="text" placeholder="Full Name" />
                <Input type="email" placeholder="Email Address" />
                <Input type="password" placeholder="Password" />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Sign Up</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}

