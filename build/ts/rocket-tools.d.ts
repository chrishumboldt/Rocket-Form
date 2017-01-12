/**
 * Author: Chris Humboldt
**/

declare namespace Rocket {
   var defaults: any;

   // Basic checks
   function exists(check: any);

   interface has {
      class(element: any, className: any);
   }
   var has: has;

   interface is {
      object(check: any): boolean;
      touch(): boolean;
   }
   var is: is;

   // Classes
   interface classes {
      add(elements: any, classes: any);
      remove(elements: any, classes: any);
   }
   var classes: classes;

   // Development
   function log(text: string);

   // DOM
   interface dom {
      body: any;
      html: any;
      select(target: string);
   }
   var dom: dom;

   // Events
   interface event {
      add(element: any, type: string, eventHandle: any);
      remove(element: any, type: string, eventHandle: any);
   }
   var event: event;

   // Helpers
   interface helper {
      setDefault(set: any, defauit: any);
   }
   var helper: helper;

   // Modules
   var form: any;
   var message: any;
}
