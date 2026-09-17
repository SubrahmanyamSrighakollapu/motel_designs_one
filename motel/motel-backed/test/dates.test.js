import test from 'node:test';
import assert from 'node:assert/strict';
import {validateStay,validDate,propertyToday} from '../src/dates.js';
test('valid stay and leap-day calculations',()=>{assert.equal(validateStay('2028-02-28','2028-03-01','2028-02-01'),2);assert.equal(validateStay('2026-10-01','2026-10-04','2026-09-17'),3);});
test('reject impossible, past, reversed and excessive dates',()=>{assert.equal(validDate('2026-02-30'),false);for(const dates of [['2026-02-30','2026-03-01'],['2026-09-16','2026-09-18'],['2026-10-02','2026-10-02'],['2026-10-05','2026-10-02'],['2026-10-01','2026-12-01'],['2028-01-01','2028-01-02']])assert.throws(()=>validateStay(...dates,'2026-09-17'));});
test('property date follows configured timezone',()=>{const old=process.env.PROPERTY_TIMEZONE;process.env.PROPERTY_TIMEZONE='Australia/Sydney';assert.equal(propertyToday(new Date('2026-09-17T23:30:00Z')),'2026-09-18');if(old===undefined)delete process.env.PROPERTY_TIMEZONE;else process.env.PROPERTY_TIMEZONE=old;});
