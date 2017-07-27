import "reflect-metadata";
import {Engine} from "prettygoat";
import {FileModule} from "prettygoat-file-store";
import BankModule from "./scripts/BankModule";

let engine = new Engine();
engine.register(new FileModule());
engine.register(new BankModule());
engine.run();