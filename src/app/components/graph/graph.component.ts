import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core'

const COOKIE_DOCTOR_KEY = "doctor"

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
  public years = [
    2019, 2020, 2021, 2022
  ]
  public doctors = [
    {id: 0, name: "Dra. Mónica Quintana"},
    {id: 1, name: "Dr. Gerardo López Martínez"}
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

  public daysInGraph = [];
  constructor(private localCookies: CookieService) { }

  ngOnInit() {
    var currentDate = new Date()
    this.selectedMonth = currentDate.getMonth()
    this.selectedYear = currentDate.getFullYear()
    var cookieDoctor = this.localCookies.get(COOKIE_DOCTOR_KEY)
    if (cookieDoctor) {
      this.selectedDoctor = +cookieDoctor
    }
    this.updateGraph()
  }

  public print() {
    this.hideButtons = true
    setTimeout(() => {
      window.print()
    }, 100)
    setTimeout(() => {
      this.hideButtons = false
    }, 200)
  }

  public getCurrentDoctorName() {
    return this.selectedDoctor > -1 ? this.doctors[this.selectedDoctor].name : ""
  }

  public recordDoctor() {
    this.localCookies.put(COOKIE_DOCTOR_KEY, this.selectedDoctor.toString())
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
  }
}
