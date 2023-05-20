export class Asignaturas {
    idAsignatura;
    nombreAsignatura ;
    codigoAsignatura;
    tipoAsignatura;
    fechaAsignatura;
    constructor(idAsignatura, nombreAsignatura, codigoAsignatura, tipoAsignatura, fechaAsignatura) {
        this.idAsignatura = idAsignatura;
        this.nombreAsignatura = nombreAsignatura;
        this.codigoAsignatura = codigoAsignatura;
        this.tipoAsignatura = tipoAsignatura;
        this.fechaAsignatura = fechaAsignatura;
        console.log('constructor de asiganatura finalizado');
    }
    show() {
        console.log('show de Asignatura = ', this.idAsignatura, this.nombreAsignatura, this.tipoAsignatura);
    }
    set IdAsignatura(setIdAsignatura) {
        this.idAsignatura = setIdAsignatura;
    };
    set NombreAsignatura(setNombreAsignatura){
        this.nombreAsignatura = setNombreAsignatura;
    };
    set TipoAsignatura(setTipoAsignatura){
        this.tipoAsignatura = setTipoAsignatura;
    };
    set FechaAsignatura(setFechaAsignatura){
        this.fechaAsignatura = setFechaAsignatura;
    }
    get IdAsignatura() {
        return (this.idAsignatura);
    }
    get NombreAsignatura() {
        return (this.nombreAsignatura);
    }
    get TipoAsignatura() {
        return (this.tipoAsignatura);
    }
    get FechaAsignatura() {
        return (this.fechaAsignatura);
    }
  }