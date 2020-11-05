import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomFieldsHelper } from '../../ui-api/helpers/custom-fields-helper';
import { ICustomFieldsModel } from '../../fleio-api/misc/model/custom-fields.model';

@Component({
  selector: 'app-custom-fields',
  templateUrl: './custom-fields.component.html',
  styleUrls: ['./custom-fields.component.scss']
})
export class CustomFieldsComponent implements OnInit, OnChanges {
  @Input() customFieldsDefinition: ICustomFieldsModel;
  @Input() expandCategory: string = null;
  @Input() customFieldsName = 'custom_fields';
  @Input() formModel = {};
  @Input() liveForm = {};
  @Input() backendErrors = {};
  customFieldsForm = this.formBuilder.group({
    // form used for custom fields controls
  })
  customFieldsByCategory = {};
  customFields = {};
  fieldCategories: Array<{
    name: string;
    collapsed: boolean;
    fields: {};
  }>;
  customFieldsToSubmit = []; // array that will store the data that has to be submitted externally
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.customFields = this.initCustomFieldsDefinition(
      this.customFields, this.customFieldsByCategory, this.customFieldsDefinition
    );
    this.fieldCategories = this.getCategories();
    let fieldAlreadyEdited;
    for (const fieldName in this.customFieldsDefinition) {
      if (this.customFieldsForm.controls.hasOwnProperty(fieldName)) {
        fieldAlreadyEdited = false;
        this.customFieldsForm.controls[fieldName].valueChanges.subscribe(value => {
          for (const editedField of this.customFieldsToSubmit) {
            if (editedField.name === fieldName) {
              fieldAlreadyEdited = true;
              editedField.value = value;
            }
          }
          if (!fieldAlreadyEdited) {
            this.customFieldsToSubmit.push({
              name: fieldName,
              value
            })
          }
        });
      }
    }
  }

  checkCustomFieldsForm() {
    for (const customFieldName in this.customFieldsDefinition) {
      if (customFieldName && this.customFieldsDefinition.hasOwnProperty(customFieldName)) {
        if (this.customFields.hasOwnProperty(customFieldName)) {
          if (this.customFields[customFieldName].required) {
            if (this.customFieldsForm.contains(customFieldName)) {
              const control = this.customFieldsForm.controls[customFieldName];
              if (control.invalid) {
                control.markAsTouched();
                return false;
              }
            }
          }
        }
      }
    }
    return true;
  }

  updateCustomFieldsDefinition() {
    if (typeof this.customFieldsDefinition === 'object' && this.customFieldsDefinition !== null) {
      for (const fieldName in this.customFieldsDefinition) {
        if (this.customFieldsDefinition.hasOwnProperty(fieldName)) {
          if (this.customFields.hasOwnProperty(fieldName)) {
            this.customFields[fieldName].required = CustomFieldsHelper.checkRule(
              this.customFieldsDefinition[fieldName].required,
              this.formModel
            );
            this.customFields[fieldName].optional = CustomFieldsHelper.checkRule(
              this.customFieldsDefinition[fieldName].optional,
              this.formModel
            );
            this.customFields[fieldName].visible = (this.customFields[fieldName].required ||
              this.customFields[fieldName].optional);
          }
        }
      }
    }
  }

  toggleCategory(index) {
    this.fieldCategories[index].collapsed = !this.fieldCategories[index].collapsed;
  };

  getModelFieldByName(name: string) {
    if (name && this.formModel && Array.isArray(this.formModel[this.customFieldsName])) {
      for (const field of this.formModel[this.customFieldsName]) {
        if (field.name === name) {
          return field;
        }
      }
    }
    return null;
  };

  getFieldValue(fieldName) {
    const modelField = this.getModelFieldByName(fieldName);
    if (modelField) {
      // init custom fields that are used externally
      this.customFieldsToSubmit.push({
        name: modelField.name,
        value: modelField.value
      })
    }
    return modelField ? modelField.value : undefined;
  }

  initCustomFieldsDefinition(customFields, customFieldsByCategory, definition) {
    if (typeof definition === 'object' && definition !== null) {
      for (const fieldName in definition) {
        if (definition.hasOwnProperty(fieldName)) {
          customFields[fieldName] = {
            required: CustomFieldsHelper.checkRule(definition[fieldName].required, this.formModel),
            optional: CustomFieldsHelper.checkRule(definition[fieldName].optional, this.formModel),
            label: definition[fieldName].label,
            choices: definition[fieldName].choices,
            type: definition[fieldName].type,
            value: this.getFieldValue(fieldName)
          };
          customFields[fieldName].visible = (customFields[fieldName].required || customFields[fieldName].optional);
          // && !customFields[fieldName].defined
          if (['text', 'textarea', 'password', 'email', 'int', 'decimal'].indexOf(
            definition[fieldName].type
          ) !== -1) {
            customFields[fieldName].fieldType = 'input';
          } else {
            customFields[fieldName].fieldType = definition[fieldName].type;
          }

          const category = definition[fieldName].category;
          if (!customFieldsByCategory.hasOwnProperty(category)) {
            customFieldsByCategory[category] = {}
          }
          customFieldsByCategory[category][fieldName] = customFields[fieldName];

          const validators = [];
          if (customFields[fieldName].required) {
            validators.push(Validators.required);
          }
          this.customFieldsForm.addControl(
            fieldName,
            this.formBuilder.control([null, validators])
          );
          this.customFieldsForm.controls[fieldName].setValue(customFields[fieldName].value);
        }
      }
    }
    return customFields;
  };

  getCategories(){
    const categoryNames = Object.keys(this.customFieldsByCategory).sort();
    const categories = [];
    for (const categoryName of categoryNames) {
      let collapsed;
      if (!this.expandCategory) {
        collapsed = true;
      }
      collapsed = !categoryName.split(',').includes(this.expandCategory);
      if (collapsed) {
        categories.push({
          name: categoryName,
          collapsed,
          fields: this.customFieldsByCategory[categoryName]
        });
      } else {
        categories.unshift({
          name: categoryName,
          collapsed,
          fields: this.customFieldsByCategory[categoryName]
        });
      }
    }
    return categories;
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes.liveForm && changes.liveForm.currentValue) {
      Object.assign(this.formModel, changes.liveForm.currentValue);
    }
    this.updateCustomFieldsDefinition();
  }

}
