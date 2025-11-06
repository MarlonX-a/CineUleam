from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Perfil(models.Model):
    TIPO_USUARIO = [
        ('Estudiante', 'Estudiante'),
        ('Profesor', 'Profesor'),
        ('Administrador', 'Administrador'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='perfil')
    tipo = models.CharField(max_length=20, choices=TIPO_USUARIO)

    def __str__(self):
        return f"{self.user.username} - {self.tipo}"
    
class Pelicula(models.Model):
    titulo = models.CharField(max_length=100)
    genero = models.CharField(max_length=50)
    duracion = models.PositiveIntegerField(help_text="Duración en minutos")
    clasificacion = models.CharField(max_length=20)
    sinopsis = models.TextField(blank=True)

    def __str__(self):
        return self.titulo
    
class Sala(models.Model):
    nombre = models.CharField(max_length=50)
    capacidad = models.PositiveIntegerField()
    ubicacion = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.nombre} ({self.capacidad} asientos)"
    
class Funcion(models.Model):
    pelicula = models.ForeignKey(Pelicula, on_delete=models.CASCADE, related_name='funciones')
    sala = models.ForeignKey(Sala, on_delete=models.CASCADE, related_name='funciones')
    fecha = models.DateField()
    hora = models.TimeField()

    def __str__(self):
        return f"{self.pelicula.titulo} - {self.fecha} {self.hora}"
    

class Reserva(models.Model):
    ESTADO_RESERVA = [
        ('Activa', 'Activa'),
        ('Cancelada', 'Cancelada'),
    ]

    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reservas')
    funcion = models.ForeignKey(Funcion, on_delete=models.CASCADE, related_name='reservas')
    fecha_reserva = models.DateField(auto_now_add=True)
    estado = models.CharField(max_length=10, choices=ESTADO_RESERVA, default='Activa')

    def __str__(self):
        return f"Reserva de {self.usuario.username} para {self.funcion}"
    
class Asistencia(models.Model):
    reserva = models.OneToOneField(Reserva, on_delete=models.CASCADE, related_name='asistencia')
    asistio = models.BooleanField(default=False)
    hora_registro = models.TimeField(null=True, blank=True)

    def __str__(self):
        return f"Asistencia de {self.reserva.usuario.username} - {'Asistió' if self.asistio else 'No asistió'}"