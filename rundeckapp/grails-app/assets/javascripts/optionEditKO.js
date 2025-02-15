/*
 * Copyright 2016 SimplifyOps, Inc. (http://simplifyops.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//= require vendor/knockout.min
//= require vendor/knockout-mapping


function OptionEditor(data) {
    var self = this;
    self.valuesList = ko.observable(data.valuesList);
    self.valuesUrl = ko.observable(data.valuesUrl);
    self.showDefaultValue = ko.observable(data.showDefaultValue);
    self.defaultValue = ko.observable(data.defaultValue);
    self.optionType = ko.observable(data.optionType);
    self.name = ko.observable(data.name);
    self.bashVarPrefix= data.bashVarPrefix? data.bashVarPrefix:'';
    self.enforceType = ko.observable(data.enforceType);
    self.originalIsNonSecure = data.showDefaultValue;
    self.tofilebashvar = function (str) {
        return self.bashVarPrefix + "FILE_" + str.toUpperCase().replace(/[^a-zA-Z0-9_]/g, '_').replace(/[{}$]/, '');
    };
    self.tobashvar = function (str) {
        return self.bashVarPrefix + "OPTION_" + str.toUpperCase().replace(/[^a-zA-Z0-9_]/g, '_').replace(/[{}$]/, '');
    };
    self.bashVarPreview=ko.computed(function(){
       return self.tobashvar(self.name());
    });

    self.fileBashVarPreview = ko.computed(function () {
        return self.tofilebashvar(self.name());
    });

    self.fileFileNameBashVarPreview = ko.computed(function () {
        return self.tofilebashvar(self.name()+'.fileName');
    });
    self.fileShaBashVarPreview = ko.computed(function () {
        return self.tofilebashvar(self.name()+'.sha');
    });

    self.isFileType = ko.computed(function () {
        return "file" === self.optionType();
    });

    self.isRegexEnforceType = ko.computed(function () {
        return self.enforceType() === "regex";
    });
    self.clearDefaultValue = function(showDefaultValueInput){
        self.defaultValue('');
        self.valuesList('');
        self.valuesUrl('');
        self.enforceType('none');
        self.showDefaultValue(showDefaultValueInput);
        return true;
    };
    self.shouldShowDefaultValue = ko.computed(function(){
        return JSON.parse(self.showDefaultValue());
    });
    self.shouldShowDefaultStorage = ko.computed(function(){
        return !JSON.parse(self.showDefaultValue());
    });
    self.isNonSecure = ko.computed(function(){
        return JSON.parse(self.showDefaultValue());
    });
    var subscription = this.optionType.subscribe(function(newValue) {
        self.showDefaultValue(self.originalIsNonSecure);
    });
}
