import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/Producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})
export class CrearProductoComponent {
  productoForm: FormGroup;

  titulo = 'Crear Producto';

  id: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private productoService: ProductoService,
    private aRouter: ActivatedRoute
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto() {
    const producto: Producto = {
      nombre: this.productoForm.get('nombre')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    };

    if (this.id !== null) {
      // Editar producto
      this.productoService.editarProducto(this.id, producto).subscribe(
        (res) => {
          this.toastr.info(
            'El producto fue actualizado con éxito',
            'Producto Actualizado'
          );
          this.router.navigate(['/']);
        },
        (err) => {
          console.log(err);
          this.toastr.error('No se pudo actualizar el producto', 'Error');
        }
      );
    } else {
      // Guardar producto
      this.productoService.guardarProducto(producto).subscribe(
        (res) => {
          console.log(res);
          this.toastr.success(
            'Producto registrado con éxito!',
            'Producto Registrado'
          );
          this.router.navigate(['/']);
        },
        (err) => {
          console.log(err);
          this.toastr.error(
            'No se pudo registrar el producto',
            'Error al registrar'
          );
          this.productoForm.reset();
        }
      );
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Producto';
      this.productoService.obtenerProducto(this.id).subscribe((data) => {
        this.productoForm.setValue({
          nombre: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio,
        });
      });
    }
  }
}
