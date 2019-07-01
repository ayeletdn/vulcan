import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CirclService {
  private basePath = "https://cve.circl.lu/api/";
  private cvePath = "cve/";

  constructor(
    private http:HttpClient
  ) { }

  getCVE(id:string) {
    if (!(/^CVE-\d+-\d+$/.test(id))) {
      throw new TypeError("Invalid CVE id");
    }

    const path = this.basePath + this.cvePath + id;
    return this.http.get(path);
  }
}


export type CVE = {
  id:string,
  summary:string,
  references: Array<string>,
  vulnerable_configuration:Array<{id:string, title:string}>,
  cvss: string,
  cwe: string,
  capec: Array<{id:string, name:string}>,
  access: {authentication:string, complexity:string, vector:string},
  impact: {availability:string, confidentiality: string, integrity: string},
  msbulletin: Array<{
    bulletin_id?: string,
    bulletin_url?: string,
    date?: Date,
    impact: string,
    knowledgebase_id: string,
    knowledgebase_url?: string,
    severity: string,
    title?: string,
    bulletin_SOURCE_FILE?: string,
    cves_url?: string,
    knowledgebase_SOURCE_FILE?: string,
    name?: string,
    publishedDate?: Date,
  }>,
  nessus: Array<{
    "NASL family": string,
    "NASL id": string,
    description: string,
    "last seen": Date,
    modified: Date,
    "plugin id": string,
    published: Date,
    reporter: string,
    source: string,
    title: string
  }>,
  Modified: Date,
  Published: Date,
  "last-modified": Date
}