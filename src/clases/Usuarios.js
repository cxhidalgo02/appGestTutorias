export class Usuarios {
    id;
    cedula;
    nombres ;
    apellidos;
    correo;
    clave;
    tipo;
    fecha;
    constructor(id, cedula, nombres, apellidos, correo, clave, tipo, fecha) {
        this.id = id;
        this.cedula = cedula;
        this.nombres = nombres;
        this.apellidos =apellidos;
        this.corre = correo;
        this.clave = clave;
        this.tipo = tipo;
        this.fecha = fecha;
        console.log('constructor de usuarios finalizado');
    }
    show() {
        console.log('show de usuarios = ', this.id, this.cedula, this.nombres);
    }
    set Id(setId) {
        this.id = setId;
    };
    set Cedula(setCedula) {
        this.cedula = setCedula;
    };
    set Nombres(setNombres){
        this.nombres = setNombres;
    };
    set Apellidos(setApellidos){
        this.apellidos = setApellidos;
    };
    set Correo(setCorreo){
        this.correo = setCorreo;
    };
    set Clave(setClave){
        this.clave = setClave;
    };
    set Tipo(setTipo){
        this.tipo = setTipo;
    };
    set Fecha(setFecha){
        this.fecha = setFecha;
    }
    get Id() {
        return (this.id);
    }
    get Cedula() {
        return (this.cedula);
    }
    get Nombres() {
        return (this.nombres);
    }
    get Apellidos() {
        return (this.apellidos);
    }
    get Correo() {
        return (this.correo);
    }
    get Clave() {
        return (this.clave);
    }
    get Tipo() {
        return (this.tipo);
    }
    get Fecha() {
        return (this.fecha);
    }
  }