import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { of, Observable } from 'rxjs';
import { tap, pluck, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CirclService {
  private basePath = "https://cve.circl.lu/api/";
  private cvePath = "cve/";
  private vendorsPath = "browse/";
  private searchPath = "search/";
  private vendors:string[] = [];
  private products:{[vendor:string]:string[]} = {};

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

  /**
   * Get (and cache) the list of vendors
   * Note: Would be better in a mem-cache/localStorage? How often refresh?
   */
  getVendors():Observable<string[]> {
    if (this.vendors.length > 0) {
      return of(this.vendors);
    }

    const path = this.basePath + this.vendorsPath;
    return this.http.get<{product:any, vendor:string[]}>(path).pipe(
      pluck('vendor'), // extract the vendor data
      tap(vendors => {this.vendors = vendors}) // cache
    );
  }
  
  getProducts(vendor:string):Observable<string[]> {
    if (!this.vendors.includes(vendor)) {
      throw new ReferenceError("Invalid vendor");
    }

    if (this.products[vendor]) {
      return of(this.products[vendor]);
    }

    const path = this.basePath + this.vendorsPath + "/" + vendor;
    return this.http.get<{product:any, vendor:string[]}>(path).pipe(
      pluck('product'), // extract the product data
      tap(products => {this.products[vendor] = products}) // cache
    );
  }

  getCVEList(vendor:string, product:string):Observable<Array<CVE>> {
    if (!this.vendors.includes(vendor)) {
      throw new ReferenceError("Invalid vendor");
    }

    if (!this.products[vendor] || !this.products[vendor].includes(product)) {
      throw new ReferenceError("Invalid product");
    }

    const path = this.basePath + this.searchPath + "/" + vendor + "/" + product;
    return this.http.get<Array<CVE>>(path);

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