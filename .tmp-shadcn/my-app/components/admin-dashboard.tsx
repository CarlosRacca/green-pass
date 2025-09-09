"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import {
  Users,
  MapPin,
  MessageSquare,
  UserPlus,
  Trophy,
  TrendingUp,
  Eye,
  Plus,
  Settings,
  Bell,
  Search,
  Filter,
  MoreHorizontal,
  Activity,
  DollarSign,
  Globe,
} from "lucide-react"
import { Input } from "@/components/ui/input"

export function AdminDashboard() {
  const adminActions = [
    {
      title: "Ver Consultas",
      description: "Gestionar consultas de clientes",
      icon: MessageSquare,
      count: 12,
      color: "bg-blue-500",
      href: "/admin/consultas",
    },
    {
      title: "Ver Viajes Vendidos",
      description: "Revisar reservas y ventas",
      icon: MapPin,
      count: 45,
      color: "bg-emerald-500",
      href: "/admin/viajes",
    },
    {
      title: "Ver Grupos",
      description: "Administrar grupos de golf",
      icon: Users,
      count: 8,
      color: "bg-purple-500",
      href: "/admin/grupos",
    },
    {
      title: "Ver Todos los Usuarios",
      description: "Gestión completa de usuarios",
      icon: Eye,
      count: 234,
      color: "bg-orange-500",
      href: "/admin/usuarios",
    },
    {
      title: "Crear Usuario",
      description: "Agregar nuevo usuario al sistema",
      icon: UserPlus,
      count: null,
      color: "bg-green-500",
      href: "/admin/usuarios/crear",
    },
    {
      title: "Crear Torneo",
      description: "Organizar nuevo torneo de golf",
      icon: Plus,
      count: null,
      color: "bg-indigo-500",
      href: "/admin/torneos/crear",
    },
    {
      title: "Ver Torneos",
      description: "Administrar torneos existentes",
      icon: Trophy,
      count: 6,
      color: "bg-yellow-500",
      href: "/admin/torneos",
    },
  ]

  const stats = [
    {
      title: "Ingresos Totales",
      value: "$124,500",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Usuarios Activos",
      value: "234",
      change: "+8.2%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Torneos Activos",
      value: "6",
      change: "+2",
      icon: Trophy,
      color: "text-yellow-600",
    },
    {
      title: "Viajes Programados",
      value: "18",
      change: "+15.3%",
      icon: Globe,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Image
                  src="/logos/green-pass-logo.png"
                  alt="Green Pass Logo"
                  width={140}
                  height={36}
                  className="h-9 w-auto"
                  priority
                />
                <h1 className="text-2xl font-bold text-foreground">Green Pass</h1>
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Experiencias
                </Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Sobre Nosotros
                </Button>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Buscar..." className="pl-10 w-64" />
              </div>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/admin-avatar.png" />
                <AvatarFallback>CR</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <h2 className="text-3xl font-bold text-foreground">Hola, carlosracca11@hotmail.com</h2>
            <span className="text-2xl">⛳</span>
          </div>
          <p className="text-muted-foreground text-lg">
            Panel de administración - Gestiona tu plataforma de golf desde aquí
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className={`text-sm ${stat.color} flex items-center mt-1`}>
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted`}>
                    <stat.icon className={`w-6 h-6 ${stat.color.replace("bg-", "text-")}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">Acciones Rápidas</h3>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtrar
              </Button>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {adminActions.map((action, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${action.color} bg-opacity-10`}>
                      <action.icon className={`w-6 h-6 ${action.color.replace("bg-", "text-")}`} />
                    </div>
                    {action.count && (
                      <Badge variant="secondary" className="text-xs">
                        {action.count}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{action.title}</CardTitle>
                  <CardDescription className="text-sm">{action.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                    variant="outline"
                  >
                    Acceder
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Actividad Reciente</span>
                </CardTitle>
                <CardDescription>Últimas acciones en la plataforma</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Ver Todo
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Nuevo usuario registrado", user: "Juan Pérez", time: "Hace 2 horas", type: "user" },
                { action: "Torneo creado", user: "Admin", time: "Hace 4 horas", type: "tournament" },
                { action: "Viaje reservado", user: "María García", time: "Hace 6 horas", type: "travel" },
                { action: "Consulta recibida", user: "Carlos López", time: "Hace 8 horas", type: "inquiry" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground">
                      por {item.user} • {item.time}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            © 2025 Green Pass. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
