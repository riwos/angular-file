import { Component, NgModule } from '@angular/core';
import { inject, ComponentFixture, TestBed, async } from '@angular/core/testing';
import { acceptType } from "./fileTools"

describe('acceptType', () => {
  it('.png,.jpeg,.gif',()=>{
    const accept = '.png,.jpeg,.gif'
    expect( acceptType(accept, 'text/comma-separated-values') ).toBe( false )
    expect( acceptType(accept, 'image/jpeg') ).toBe( true )
    expect( acceptType(accept, 'image/gif') ).toBe( true )
    expect( acceptType(accept, 'image/png') ).toBe( true )
  })

  it('.mxf,video/*',()=>{
    const accept = '.mxf,video/*'
    expect( acceptType(accept, 'mxf/video') ).toBe( false )
    expect( acceptType(accept, 'audio/mxf') ).toBe( true )
    expect( acceptType(accept, 'video/mxf') ).toBe( true )
    expect( acceptType(accept, '', '<my-file>.mxf') ).toBe( true )
  })
})