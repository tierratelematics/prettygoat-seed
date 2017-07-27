import {
    IModule,
    IProjectionRegistry,
    IServiceLocator,
    IEndpointConfig,
    ISocketConfig,
    INotificationConfig
} from "prettygoat";
import {interfaces} from "inversify";
import {AccountsProjection} from "./AccountsProjection";

class BankModule implements IModule {

    modules = (container: interfaces.Container) => {
        container.bind<IEndpointConfig>("IEndpointConfig").toConstantValue({
            port: 3000
        });
        container.bind<ISocketConfig>("ISocketConfig").toConstantValue({
            path: "/notifications"
        });
        container.bind<INotificationConfig>("INotificationConfig").toConstantValue({
            host: "localhost",
            protocol: "http"
        });
    };

    register(registry: IProjectionRegistry, serviceLocator?: IServiceLocator, overrides?: any): void {
        registry.add(AccountsProjection).forArea("Accounts");
    }
}

export default BankModule