class turno {
    constructor(numeroTurno, dia, mes, ocupado) {
      this.numeroTurno = "Turno" + numeroTurno;
      this.dia = parseInt(dia);
      this.mes = mes;
      this.ocupado = ocupado;
    }
    reservar() {
      //this.ocupado = true;
      return (this.ocupado = true);
    }
  }
  function reservarTurno(turnoR) {
    turnoR.reservar();
  }
  let diaTurno = prompt("Elegi un turno");
  console.log("El turno elegido es el " + diaTurno + ". Te lo vamos a resvar");
  const turno1 = new turno(1, diaTurno, "Mayo", false);
  console.log(turno1.ocupado); // no ocupado
  reservarTurno(turno1);
  console.log(turno1.reservar()); //ocupado