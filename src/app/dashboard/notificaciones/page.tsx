import Notifications from '@/components/notifications'
import { Notification } from '@/types/notificaction'

const notificationsData: Notification[] = [
  {
    id: '1',
    title: 'Actualización de sistema',
    description: 'Se requiere reiniciar el servidor para aplicar las últimas actualizaciones.',
    status: 'pendiente',
    priority: 'alta',
    date: '2023-06-15 10:00'
  },
  {
    id: '2',
    title: 'Nuevo ticket de soporte',
    description: 'El cliente reporta problemas con el inicio de sesión.',
    status: 'en-progreso',
    priority: 'media',
    date: '2023-06-14 15:30'
  },
  {
    id: '3',
    title: 'Mantenimiento completado',
    description: 'El mantenimiento programado se ha completado con éxito.',
    status: 'completado',
    priority: 'baja',
    date: '2023-06-13 09:45'
  },
  {
    id: '4',
    title: 'Reunión cancelada',
    description: 'La reunión de equipo programada para hoy ha sido cancelada.',
    status: 'cancelado',
    priority: 'baja',
    date: '2023-06-12 16:00'
  },
  {
    id: '5',
    title: 'Reunión realizada',
    description: 'La reunión de equipo programada para hoy.',
    status: 'cancelado',
    priority: 'baja',
    date: '2023-06-12 16:00'
  }
]

export default function Home() {
  return (
    <main className="w-full flex items-center justify-center flex-col gap-4">
      <h1 className="text-2xl font-bold text-center py-4">
        Notificaciones
      </h1>
      {notificationsData.length > 0 ? (
        <section className="w-full mx-auto space-y-4">
          <Notifications notifications={notificationsData} />
        </section>
      ) : (
        <p className="text-lg text-gray-600 dark:text-gray-400 text-center">
          No tienes notificaciones en este momento...
        </p>
      )}
    </main>
  )
}

