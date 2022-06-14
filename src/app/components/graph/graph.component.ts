import { Component, OnInit } from '@angular/core';
//import { CookieService } from 'ngx-cookie'
//import { CookieService } from 'ngx-cookie';

const COOKIE_DOCTOR_KEY = "doctor"

type TableRow = {
  number: number,
  dayOfWeek: string
}

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  public hideButtons = false
  public selectedMonth = 0
  public selectedYear = 0
  public selectedDoctor = -1
  public selectedPlan = "";
  public patientName: string;
  public years = [
    2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030
  ]
  public doctors = [
    {id: 0, name: "Dra. Mónica Quintana"},
    {id: 1, name: "Dr. Gerardo López Martínez"},
    {id: 2, name: "Dr. Jesús López Carrizoza"}
  ]

  public plans = [
    "Escaloneada", "Pareada", "Ayuno/Pre-cena"
  ]
  public months = [
    {id: 0,  name: "enero"},
    {id: 1,  name: "febrero"},
    {id: 2,  name: "marzo"},
    {id: 3,  name: "abril"},
    {id: 4,  name: "mayo"},
    {id: 5,  name: "junio"},
    {id: 6,  name: "julio"},
    {id: 7,  name: "agosto"},
    {id: 8,  name: "septiembre"},
    {id: 9,  name: "octubre"},
    {id: 10, name: "noviembre"},
    {id: 11, name: "diciembre"}
  ]
  public daysOfWeek = new Map([
    [0, "domingo"],
    [1, "lunes"],
    [2, "martes"],
    [3, "miércoes"],
    [4, "jueves"],
    [5, "viernes"],
    [6, "sábado"],
  ])

  public daysInGraph: TableRow[] = [];
  //constructor(private localCookies: CookieService) { }
  constructor() {}

  ngOnInit() {
    var currentDate = new Date()
    this.selectedMonth = currentDate.getMonth()
    this.selectedYear = currentDate.getFullYear()
    // var cookieDoctor = this.localCookies.get(COOKIE_DOCTOR_KEY)
    // if (cookieDoctor) {
    //   this.selectedDoctor = +cookieDoctor
    // }
    this.updateGraph()
  }

  public print() {
    this.hideButtons = true
    setTimeout(() => {
      window.print()
    }, 100)
    setTimeout(() => {
      this.hideButtons = false
    }, 1000)
  }

  public getCurrentDoctorName() {
    return this.selectedDoctor > -1 ? this.doctors[this.selectedDoctor].name : ""
  }

  public recordDoctor() {
    //this.localCookies.put(COOKIE_DOCTOR_KEY, this.selectedDoctor.toString())
  }

  private updatePlan() {
    if (this.selectedPlan == "Escaloneada") {
      let currColumn = 1;
      for (let day of this.daysInGraph) {
        console.log(currColumn + '-' + day.number);
        let currSquare = document.getElementById(currColumn + "-" + day.number);
        currSquare.style.backgroundColor = "#D7D7D7";
        currColumn = (currColumn%6) + 1;
      }
    } else if (this.selectedPlan == "Pareada") {
      let columns = [1, 3, 5];
      let currColumn = 0;
      for (let day of this.daysInGraph) {
        let currSquare = document.getElementById(columns[currColumn] + "-" + day.number);
        let secondSquare = document.getElementById((columns[currColumn] + 1) + "-" + day.number);
        currSquare.style.backgroundColor = "#D7D7D7";
        secondSquare.style.backgroundColor = "#D7D7D7";
        currColumn = (currColumn+1)%3;
      }
    } else if (this.selectedPlan == "Ayuno/Pre-cena") {
      for (let day of this.daysInGraph) {
        let currSquare = document.getElementById("1-" + day.number);
        let secondSquare = document.getElementById("5-" + day.number);
        currSquare.style.backgroundColor = "#D7D7D7";
        secondSquare.style.backgroundColor = "#D7D7D7";
      }
    }
  }

  public updateGraph() {
    this.daysInGraph = []
    var currDate = new Date(this.selectedYear + "/" + (+this.selectedMonth + 1) + "/" + "01")
    while(currDate.getMonth() == this.selectedMonth) {
      this.daysInGraph.push({
        number: currDate.getDate(),
        dayOfWeek: this.daysOfWeek.get(currDate.getDay())
      })
      currDate = new Date(currDate.getTime() + 86400000)
    }
    // Give DOM time to update.
    setTimeout(() => {
      this.updatePlan();
    }, 500);
  }
}
