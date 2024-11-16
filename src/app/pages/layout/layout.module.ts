import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule,
  NbListModule, NbMenuModule,
  NbRouteTabsetModule, NbSelectModule,
  NbStepperModule,
  NbTabsetModule, NbTooltipModule, NbUserModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { Tab1Component, Tab2Component, TabsComponent } from './tabs/tabs.component';
import { StepperComponent } from './stepper/stepper.component';
import { ListComponent } from './list/list.component';
import { InfiniteListComponent } from './infinite-list/infinite-list.component';
import { AccordionComponent } from './accordion/accordion.component';
import { NewsService } from './news.service';
import {CloudComponent} from './cloud/cloud.component';
import {ClusterComponent} from './cluster/cluster.component';
import {BaseComponent} from './core/base/base.component';
import {SimpleFormDialogComponent} from './core/form-dialog/simple-form-dialog/simple-form-dialog.component';
import {SensorComponent} from './sensor/sensor.component';
import {FogDeviceComponent} from './fog-device/fog-device.component';
import {FogGatewayComponent} from "./fog-gateway/fog-gateway.component";
import {ServerComponent} from "./server/server.component";
import {MenuComponent} from "./menu/menu.component";
import {FromToAnimationComponent} from "./from-to-animation/from-to-animation.component";
import {BrokerComponent} from "./broker/broker.component";
import { ClusterDialogComponent } from './cluster/cluster-dialog/cluster-dialog.component';
import {ServerDialogComponent} from './server/server-dialog/server-dialog.component';
import {ExtraComponentsModule} from '../extra-components/extra-components.module';
import {DashboardModule} from "../dashboard/dashboard.module";
import {FogDeviceDialogComponent} from "./fog-device/fog-device-dialog/fog-device-dialog.component";
import {FogGatewayDialogComponent} from "./fog-gateway/fog-gateway-dialog/fog-gateway-dialog.component";
import {BrokerDialogComponent} from "./broker/broker-dialog/broker-dialog.component";
import {SensorDialogComponent} from "./sensor/sensor-dialog/sensor-dialog.component";
import {ChartsModule} from "../charts/charts.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import { DialogBaseComponent } from './core/base/dialog-base/dialog-base.component';
import { StartDialogComponent } from './stepper/start-dialog/start-dialog.component';
import {SaveDialogComponent} from "./cluster/save-dialog/save-dialog.component";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    LayoutRoutingModule,
    NbSelectModule,
    NbTooltipModule,
    NbInputModule,
    NbCheckboxModule,
    ExtraComponentsModule,
    DashboardModule,
    ChartsModule,
    Ng2SmartTableModule,
    NbIconModule,
    NbMenuModule,

  ],
  declarations: [
    LayoutComponent,
    TabsComponent,
    Tab1Component,
    Tab2Component,
    StepperComponent,
    ListComponent,
    InfiniteListComponent,
    AccordionComponent,
    CloudComponent,
    ClusterComponent,
    BaseComponent,
    SimpleFormDialogComponent,
    SensorComponent,
    FogDeviceComponent,
    FogGatewayComponent,
    ServerComponent,
    MenuComponent,
    FromToAnimationComponent,
    BrokerComponent,
    ServerDialogComponent,
    ClusterDialogComponent,
    FogDeviceDialogComponent,
    FogGatewayDialogComponent,
    BrokerDialogComponent,
    SensorDialogComponent,
    DialogBaseComponent,
    StartDialogComponent,
    SaveDialogComponent
  ],
  providers: [
    NewsService,
  ],
})
export class LayoutModule { }
