import { Component, NgModule } from '@angular/core';
import { inject, ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FileUploader } from "./FileUploader.class"

describe('FileUploader', () => {
  
  it('inits', ()=>{
    expect(FileUploader).not.toBeNull();
    expect(new FileUploader()).not.toBeNull();
  })

  it('.png,.jpeg,.gif',()=>{
    const options = {accept:'.png,.jpeg,.gif'}
    const fU = new FileUploader(options)
    expect( fU.acceptType('text/comma-separated-values') ).toBe( false )
    expect( fU.acceptType('image/jpeg') ).toBe( true )
    expect( fU.acceptType('image/gif') ).toBe( true )
    expect( fU.acceptType('image/png') ).toBe( true )
  })

  it('.mxf,video/*',()=>{
    const options = {accept:'.mxf,video/*'}
    const fU = new FileUploader(options)
    expect( fU.acceptType('mxf/video') ).toBe( false )
    expect( fU.acceptType('audio/mxf') ).toBe( true )
    expect( fU.acceptType('video/mxf') ).toBe( true )
    expect( fU.acceptType('','<my-file>.mxf') ).toBe( true )
  })
})