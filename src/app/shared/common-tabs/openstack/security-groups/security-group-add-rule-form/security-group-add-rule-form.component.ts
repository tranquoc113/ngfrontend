import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { ISecurityGroupModel } from '@fleio-api/openstack/model/security-group.model';
import { FormBuilder, Validators } from '@angular/forms';
import { SecurityGroupsApiService } from '@fleio-api/openstack/security-groups/security-groups-api.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { EMPTY, of } from 'rxjs';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';

@Component({
  selector: 'app-security-group-add-rule-form',
  templateUrl: './security-group-add-rule-form.component.html',
  styleUrls: ['./security-group-add-rule-form.component.scss']
})
export class SecurityGroupAddRuleFormComponent extends DetailsFormBase<ISecurityGroupModel> implements OnInit {
  ruleTypes = {
    Any: {
      protocol: null
    },
    'Custom TCP rule': {
      fields: ['port'],
      protocol: 'TCP',
    },
    'Custom UDP rule': {
      fields: ['port'],
      protocol: 'UDP',
    },
    'Custom ICMP rule': {
      fields: ['icmp_type', 'icmp_code'],
      protocol: 'ICMP'
    },
    'Other protocol': {
      fields: ['protocol', 'port'],
      port_required: false,
    },
    'All TCP': {port_range: '1:65535', protocol: 'TCP'},
    'All UDP': {port_range: '1:65535', protocol: 'UDP'},
    'All ICMP': {protocol: 'ICMP'},
    DNS: {
      protocol: 'UDP',
      port_range: '53'
    },
    FTP: {
      protocol: 'TCP',
      port_range: '21'
    },
    HTTP: {
      protocol: 'TCP',
      port_range: '80'
    },
    HTTPS: {
      protocol: 'TCP',
      port_range: '443'
    },
    IMAP: {
      protocol: 'TCP',
      port_range: '143'
    },
    IMAPS: {
      protocol: 'TCP',
      port_range: '993'
    },
    LDAP: {
      protocol: 'TCP',
      port_range: '389'
    },
    'MS SQL': {
      protocol: 'TCP',
      port_range: '1433'
    },
    MySQL: {
      protocol: 'TCP',
      port_range: '3306'
    },
    POP3: {
      protocol: 'TCP',
      port_range: '110'
    },
    POP3S: {
      protocol: 'TCP',
      port_range: '995'
    },
    RDP: {
      protocol: 'TCP',
      port_range: '3389'
    },
    SFTP: {
      protocol: 'TCP',
      port_range: '115'
    },
    SMTP: {
      protocol: 'TCP',
      port_range: '25'
    },
    SMTPS: {
      protocol: 'TCP',
      port_range: '465'
    },
    SSH: {
      protocol: 'TCP',
      port_range: '22'
    },
    WHOIS: {
      protocol: 'TCP',
      port_range: '43'
    }
  };
  loading = false;
  addRuleForm = this.formBuilder.group({
    ruleType: [Object.keys(this.ruleTypes)[0]],
    description: [''],
    direction: ['ingress', Validators.required],
    remote: ['cidr', Validators.required],
    remote_ip_prefix: ['0.0.0.0/0', Validators.required],
    remote_group_id: ['', Validators.required],
    ethertype: ['IPv4', Validators.required],
    protocol: ['', [Validators.required, Validators.min(1), Validators.max(255)]],
    port_range_min: ['', Validators.required],
    port_range_max: ['', Validators.required],
    port_range: [''],
    icmp_type: ['', [Validators.min(0), Validators.max(255)]],
    icmp_code: ['', [Validators.min(0), Validators.max(255)]],
    security_group_id: ['', Validators.required],
  });
  securityGroups: Array<ISecurityGroupModel> = [];
  portRequired = false;
  portField = false;
  protocolField = false;
  icmpTypeField = false;
  icmpCodeField = false;

  constructor(
    private formBuilder: FormBuilder,
    private securityGroupsApiService: SecurityGroupsApiService,
    private notificationService: NotificationService,
    private router: Router,
    private config: ConfigService,
  ) {
    super();
  }

  addRule() {
    this.validate();
    if (this.addRuleForm.invalid) {
      this.displayControlErrors();
      return EMPTY;
    }
    this.loading = true;
    const value = this.addRuleForm.getRawValue();
    if (this.portField && value.port_range) {
      const ports = value.port_range.split(':');
      if (ports.length > 1) {
        value.port_range_min = ports[0];
        value.port_range_max = ports[1];
      } else {
        value.port_range_min = value.port_range_max = ports[0];
      }
    }
    if (value.remote === 'cidr') {
      delete value.remote_group_id;
      delete value.ethertype;
    } else {
      value.remote_ip_prefix = '';
    }
    delete value.remote; // we don't need to send this
    if (this.ruleTypes[value.ruleType].hasOwnProperty('protocol')) {
      value.protocol = this.ruleTypes[value.ruleType].protocol;
    }
    // pre defined port range
    if (this.ruleTypes[value.ruleType].hasOwnProperty('port_range')) {
      if (this.ruleTypes[value.ruleType].port_range.indexOf(':') !== -1) {
        const portRangeSplit = this.ruleTypes[value.ruleType].port_range.split(':');
        value.port_range_min = portRangeSplit[0];
        value.port_range_max = portRangeSplit[1];
      } else {
        value.port_range_min = this.ruleTypes[value.ruleType].port_range;
        value.port_range_max = this.ruleTypes[value.ruleType].port_range;
      }
    }
    if (this.icmpTypeField) {
      if (value.icmp_type) {
        value.port_range_min = value.icmp_type;
      }
    }
    if (this.icmpCodeField) {
      if (value.icmp_code) {
        value.port_range_max = value.icmp_code;
      }
    }
    delete value.ruleType; // we don't need to send this
    this.securityGroupsApiService.addRule(this.object.id, value).subscribe(response => {
      this.loading = false;
      this.notificationService.showMessage('Add rule scheduled');
      this.router.navigateByUrl(
        this.config.getPanelUrl(`openstack/security-groups/${this.object.id}`)
      ).catch(() => {});
    }, error => {
      this.loading = false;
      if (error.error) {
        this.setErrors(error.error);
      }
    })
    return of(null);
  }

  changedAllPorts(event) {
    if (event.checked === true) {
      this.addRuleForm.controls.port_range.setValue('1:65535');
      this.addRuleForm.controls.port_range.disable();
    } else {
      this.addRuleForm.controls.port_range.setValue('');
      if (this.addRuleForm.controls.port_range.disabled) {
        this.addRuleForm.controls.port_range.enable();
      }
    }
  }

  changedRemoteSource() {
    const remoteSource = this.addRuleForm.controls.remote.value;
    if (remoteSource === 'cidr') {
      if (!this.addRuleForm.contains('remote_ip_prefix')) {
        this.addRuleForm.addControl(
          'remote_ip_prefix',
          this.formBuilder.control('0.0.0.0/0', Validators.required)
        );
      }
      if (this.addRuleForm.contains('remote_group_id')) {
        this.addRuleForm.removeControl('remote_group_id');
      }
      if (this.addRuleForm.contains('ethertype')) {
        this.addRuleForm.removeControl('ethertype');
      }
    } else {
      if (!this.addRuleForm.contains('remote_group_id')) {
        let controlValue = '';
        if (this.securityGroups && this.securityGroups.length) {
          controlValue = this.securityGroups[0].id as any;
        }
        this.addRuleForm.addControl(
          'remote_group_id',
          this.formBuilder.control(controlValue, Validators.required)
        );
      }
      if (!this.addRuleForm.contains('ethertype')) {
        this.addRuleForm.addControl('ethertype', this.formBuilder.control('IPv4', Validators.required));
      }
      if (this.addRuleForm.contains('remote_ip_prefix')) {
        this.addRuleForm.removeControl('remote_ip_prefix');
      }
    }
  }

  changedRuleType() {
    const ruleType = this.addRuleForm.controls.ruleType.value;
    const ruleTypeDef = this.ruleTypes[ruleType];
    if (ruleTypeDef.hasOwnProperty('port_required')) {
      this.portRequired = ruleTypeDef.port_required;
    } else {
      this.portRequired = true;
    }
    if (ruleTypeDef.hasOwnProperty('fields')) {
      this.portField = ruleTypeDef.fields.indexOf('port') !== -1;
      this.protocolField = ruleTypeDef.fields.indexOf('protocol') !== -1;
      this.icmpTypeField = ruleTypeDef.fields.indexOf('icmp_type') !== -1;
      this.icmpCodeField = ruleTypeDef.fields.indexOf('icmp_code') !== -1;
    } else {
      if (ruleTypeDef.hasOwnProperty('protocol')) {
        if (!this.addRuleForm.contains('protocol')) {
          this.addRuleForm.addControl('protocol', this.formBuilder.control(ruleTypeDef.protocol, [
            Validators.required, Validators.min(1), Validators.max(255)
          ]));
        } else {
          this.addRuleForm.controls.protocol.setValue(ruleTypeDef.protocol);
        }
      }
      if (ruleTypeDef.hasOwnProperty('port_range')) {
        if (ruleTypeDef.port_range.indexOf(':') !== -1) {
          const portRangeSplitted = ruleTypeDef.port_range.split(':');
          if (!this.addRuleForm.contains('port_range_min')) {
            this.addRuleForm.addControl('port_range_min', this.formBuilder.control(portRangeSplitted[0]));
          } else {
            this.addRuleForm.controls.port_range_min.setValue(portRangeSplitted[0]);
          }
          if (!this.addRuleForm.contains('port_range_max')) {
            this.addRuleForm.addControl('port_range_max', this.formBuilder.control(portRangeSplitted[1]));
          } else {
            this.addRuleForm.controls.port_range_max.setValue(portRangeSplitted[1]);
          }
        } else {
          if (!this.addRuleForm.contains('port_range_min')) {
            this.addRuleForm.addControl('port_range_min', this.formBuilder.control(ruleTypeDef.port_range));
          } else {
            this.addRuleForm.controls.port_range_min.setValue(ruleTypeDef.port_range);
          }
          if (!this.addRuleForm.contains('port_range_max')) {
            this.addRuleForm.addControl('port_range_max', this.formBuilder.control(ruleTypeDef.port_range));
          } else {
            this.addRuleForm.controls.port_range_max.setValue(ruleTypeDef.port_range);
          }
        }
      }
      this.portField = this.protocolField = this.icmpTypeField = this.icmpCodeField = false;
    }
    if (!this.portField) {
      this.addRuleForm.removeControl('port_range');
      this.addRuleForm.removeControl('port_range_min');
      this.addRuleForm.removeControl('port_range_max');
    } else {
      if (!this.addRuleForm.contains('port_range')) {
        this.addRuleForm.addControl('port_range', this.formBuilder.control(''));
      }
      if (!this.addRuleForm.contains('port_range_min')) {
        this.addRuleForm.addControl('port_range_min', this.formBuilder.control(''));
      }
      if (!this.addRuleForm.contains('port_range_max')) {
        this.addRuleForm.addControl('port_range_max', this.formBuilder.control(''));
      }
    }
    if (this.addRuleForm.contains('port_range')) {
      if (this.portRequired) {
        this.addRuleForm.controls.port_range.setValidators(Validators.required);
      } else {
        this.addRuleForm.controls.port_range.clearValidators();
      }
    }
    if (!this.protocolField) {
      this.addRuleForm.removeControl('protocol');
    } else {
      this.addRuleForm.addControl(
        'protocol',
        this.formBuilder.control('', [
          Validators.required, Validators.min(1), Validators.max(255)
        ])
      );
    }
    if (!this.icmpTypeField) {
      this.addRuleForm.removeControl('icmp_type');
    } else {
      this.addRuleForm.addControl('icmp_type', this.formBuilder.control(''));
    }
    if (!this.icmpCodeField) {
      this.addRuleForm.removeControl('icmp_code');
    } else {
      this.addRuleForm.addControl('icmp_code', this.formBuilder.control(''));
    }
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.addRule();
    }
    if (this.object) {
      this.securityGroupsApiService.getSecurityGroupsForProject(
        this.object.project
      ).subscribe((response: { security_groups: Array<ISecurityGroupModel> }) => {
        this.securityGroups = response.security_groups;
        if (this.securityGroups && this.securityGroups.length && this.addRuleForm.contains('remote_group_id')) {
          this.addRuleForm.controls.remote_group_id.setValue(this.securityGroups[0].id);
        }
      }, error => {
        this.notificationService.showMessage('Error when getting security groups for project');
      });
      this.addRuleForm.controls.security_group_id.setValue(this.object.id);
    }
    this.changedRuleType();
    this.changedRemoteSource();
  }

}
