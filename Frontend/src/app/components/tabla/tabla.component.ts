import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PersonaService } from 'src/app/servicios/persona.service';
import { Persona } from 'src/app/model/persona';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  @ViewChild('btnClose', { static: false }) btnClose: ElementRef;
 
  personas: Persona[] = [];
  persona: Persona = {
    id:0,
    nombre: '',
    apellido: '',
    dni: 0
 }
 public miFornmulario: FormGroup 
  
 constructor(private servicio: PersonaService , private router : Router , private actRoute : ActivatedRoute , private fb: FormBuilder) { }

  ngOnInit() {
    this.getAll();
    console.log(this.personas);
    this.Formulario();
  }

 public Formulario(){
  this.miFornmulario = this.fb.group({
    id:[this.persona.id,Validators.required],
    nombre:[this.persona.nombre,Validators.required, Validators.minLength(2)],
    apellido: [this.persona.apellido,Validators.required],
    dni: [this.persona.dni,Validators.required]
  });
 }
  
  getAll(){
    this.servicio.getAll().subscribe((data) =>{
      this.personas = data;
    },
    err => console.log('Error HTTP', err)
    );
  }

  delete(id:number, cont: number){
    this.servicio.delete(id).subscribe(data => {
      console.log(data);
    alert('Se elimino el ID: '+id);
    window.location.reload();
      this.Formulario();
      this.personas.splice(cont, 1);
    },
    ()=>{
      alert("No se pudo borrar: "+id);
    })
  }

  agregar(persona: Persona){
    this.servicio.post(persona).subscribe(data =>{
      this.persona = data;
      console.log(data);
      this.personas.push(this.persona);
    },
    err => console.log("Error http",err)
    );
  }

  update(persona: Persona) {
    this.persona = persona;
    this.Formulario();
  }

  add(){
    const persona: Persona = {
      id: 0, nombre: '', apellido: '', dni: 0 };
      this.persona = persona;
      this.Formulario();
    }
  
  actualizar(persona: Persona){
    const idPer = persona.id;
    this.servicio.put(idPer, persona).subscribe(data => {
      this.persona = data;
      const id = this.persona.id;
      const nombre = this.persona.nombre;
      const apellido = this.persona.apellido;
      const dni = this.persona.dni;
      this.personas.map(function (dato) {
        if (dato.id === id) {
          dato.nombre = nombre;
          dato.apellido = apellido;
          dato.dni = dni;
        }
      });
    },
    err => console.log('Error http ',err)
    );
  }


  save(miFornmulario: FormGroup, cont: number) {
    if (miFornmulario.value.id === '' || miFornmulario.value.id === 0) {
      this.agregar(miFornmulario.value);
    } else {
      this.actualizar(miFornmulario.value);
    }
    miFornmulario.reset();
    this.btnClose.nativeElement.click();
  }

}