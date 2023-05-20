export class Tutorias {
    idTutoria;
    codigoTutoria;
    temaTutoria ;
    descricionTutoria;
    aulaTutoria;
    horaTutoria;
    semanaTutoria;
    fechaTutoria;


    constructor(idTutoria, codigoTutoria, temaTutoria, descricionTutoria, aulaTutoria, horaTutoria, semanaTutoria, fechaTutoria) {
        this.idTutoria = idTutoria;
        this.codigoTutoria = codigoTutoria;
        this.temaTutoria = temaTutoria;
        this.descricionTutoria = descricionTutoria;
        this.aulaTutoria = aulaTutoria;
        this.horaTutoria = horaTutoria;
        this.semanaTutoria = semanaTutoria;
        this.fechaAsignatura = fechaTutoria;
        console.log('constructor de tutoria finalizado');
    }
    show() {
        console.log('show de Tutoria = ', this.idCodigo, this.temaTutoria, this.semanaTutoria);
    }
    set IdTutoria(setIdCodigoTutoria) {
        this.idTutoria = setIdCodigoTutoria;
    };
    set CodigoTutoria(setCodigoTutoria) {
        this.codigoTutoria = setCodigoTutoria;
    };
    set TemaTutoria(setTemaTutoria) {
        this.temaTutoria = setTemaTutoria;
    };
    set DescricionTutoria(setDescripcionTutoria) {
        this.descricionTutoria = setDescripcionTutoria;
    };
    set AulaTutoria(setAulaTutoria) {
        this.aulaTutoria = setAulaTutoria;
    };
    set HoraTutoria(setHoraTutoria) {
        this.horaTutoria = setHoraTutoria;
    };
    set SemanaTutoria(setSemanaTutoria) {
        this.semanaTutoria = setSemanaTutoria;
    };
    set FechaTutoria(setFechaTutoria) {
        this.fechaTutoria = setFechaTutoria;
    };

    get IdTutoria() {
        return (this.idTutoria);
    }
    get CodigoTutoria() {
        return (this.codigoTutoria);
    }
    get TemaTutoria() {
        return (this.temaTutoria);
    }
    get DescricionTutoria() {
        return (this.descricionTutoria);
    }
    get AulaTutoria() {
        return (this.aulaTutoria);
    }
    get HoraTutoria() {
        return (this.horaTutoria);
    }
    get SemanaTutoria() {
        return (this.semanaTutoria);
    }
    get FechaTutoria() {
        return (this.fechaTutoria);
    }
  }