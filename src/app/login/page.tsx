import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <main className="py-16">
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold self-center">Login</CardTitle>
        <CardDescription className="self-center">Just for admin</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="mx-8">Username</Label>
            <Input id="email" type="email" placeholder="username" required className="w-64 mx-8"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="mx-8">Password</Label>
            <Input id="password" type="password" placeholder="password" required className="w-64 mx-8"/>
          </div>
          <Button type="submit" className="w-64 mx-8">
            Login
          </Button>
        </div>
      </CardContent>
    </Card>
    </main>
  )
}