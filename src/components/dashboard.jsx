import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, CreditCard, BarChart3 } from "lucide-react"

export function Dashboard() {
  return (
    <section className="py-12 px-6 bg-card/50">
      <div className="container mx-auto max-w-7xl">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <span className="text-2xl font-bold text-primary">P</span>
            </div>
            <div className="flex items-center space-x-8">
              <button className="text-foreground font-medium border-b-2 border-primary pb-2">Dashboard</button>
              <button className="text-muted-foreground hover:text-foreground">Reports</button>
              <button className="text-muted-foreground hover:text-foreground">Cryptocurrency</button>
              <button className="text-muted-foreground hover:text-foreground">Exchange</button>
              <button className="text-muted-foreground hover:text-foreground">Community</button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Ilona Smilkuet</p>
              <p className="text-xs text-muted-foreground">ilona.s44@gmail.com</p>
            </div>
            <Avatar>
              <AvatarImage src="/professional-woman-diverse.png" />
              <AvatarFallback>IS</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back, Ilona</h2>
          <p className="text-muted-foreground">Here's a look at your performance and analytics.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">SPENT THIS MONTH</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$5,950.64</div>
              <div className="flex items-center text-sm">
                <TrendingUp className="h-3 w-3 text-primary mr-1" />
                <span className="text-primary">+2.34%</span>
                <span className="text-muted-foreground ml-1">24H CHANGE</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active credit</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$24,500</div>
              <div className="text-sm text-muted-foreground">$15,000</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Your credit score</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">660</div>
                  <div className="text-sm text-muted-foreground">Last Check on 21 Apr</div>
                </div>
                <div className="relative h-16 w-16">
                  <svg className="h-16 w-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="80, 100"
                      className="text-primary"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">80%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">VOLUME (24H)</CardTitle>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$12,450</div>
              <div className="flex items-center text-sm">
                <TrendingDown className="h-3 w-3 text-destructive mr-1" />
                <span className="text-destructive">-1.2%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Performance Overview</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  January 2024 - May 2024
                </Badge>
                <button className="text-sm text-muted-foreground hover:text-foreground">Add new coin</button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-card rounded-lg border border-border flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Chart visualization would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
