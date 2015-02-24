/**
* @jsx React.DOM
*/
'use strict';

var React = require('react');

var joinClasses = require('./joinClasses');

// TODO: MOVE TO Log MODEL??
function getLogElements(logs) {
 return logs.map(function (log, idx) {
   // TODO: replace idx with something else??
   return (
     <li key={ idx } className="list-group-item inner-padding">
       <span className={ joinClasses(log.getActionClass(), 'log-item') } dangerouslySetInnerHTML={{__html: log.toHTMLString() }} />
     </li>
   );
 });
}

module.exports = getLogElements;
