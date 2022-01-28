import {
  Transfer as CreepzTransferEvent,
  Creepz as CreepzContract
} from "../generated/Creepz/Creepz"
import {
  Transfer as ArmouryTransferEvent,
  ReptileArmoury as ArmouryContract
} from "../generated/ReptileArmoury/ReptileArmoury"
import {
  Transfer as ShapeshifterTransferEvent,
  ShapeShifters as ShapeShifterContract
} from "../generated/ShapeShifters/ShapeShifters"
import {
  Transfer as MegaShapeshifterTransferEvent,
  TokensMinted as MegaShapeShiftersMintedEvent,
  MegaShapeShifters as MegaShapeShifterContract
} from "../generated/MegaShapeShifters/MegaShapeShifters"
import { Armoury, Creep, ShapeShifter, MegaShapeShifter, Owner } from "../generated/schema"

export function handleCreepzTransfer(event: CreepzTransferEvent): void {
  let token = Creep.load(event.params.tokenId.toString());
  if (!token) {
    token = new Creep(event.params.tokenId.toString());
    token.createdAtTimestamp = event.block.timestamp;
  
    let contract = CreepzContract.bind(event.address);
    token.contentURI = contract.tokenURI(event.params.tokenId);
  }
  token.creepOwner = event.params.to.toHexString();
  token.save();

  handleNewOwner(event.params.to.toHexString());
}

export function handleArmouryTransfer(event: ArmouryTransferEvent): void {
  let token = Armoury.load(event.params.tokenId.toString());
  if (!token) {
    token = new Armoury(event.params.tokenId.toString());
    token.createdAtTimestamp = event.block.timestamp;
  
    let contract = ArmouryContract.bind(event.address);
    token.contentURI = contract.tokenURI(event.params.tokenId);
  }
  token.armouryOwner = event.params.to.toHexString();
  token.save();

  handleNewOwner(event.params.to.toHexString());
}

export function handleShapeShifterTransfer(event: ShapeshifterTransferEvent): void {
  let token = ShapeShifter.load(event.params.tokenId.toString());
  if (!token) {
    token = new ShapeShifter(event.params.tokenId.toString());
    token.createdAtTimestamp = event.block.timestamp;
  
    let contract = ShapeShifterContract.bind(event.address);
    token.contentURI = contract.tokenURI(event.params.tokenId);
  }
  token.shapeShifterOwner = event.params.to.toHexString();
  token.save();

  handleNewOwner(event.params.to.toHexString());
}

export function handleMegaShapeShifterTransfer(event: MegaShapeshifterTransferEvent): void {
  let token = MegaShapeShifter.load(event.params.tokenId.toString());
  if (!token) {
    token = new MegaShapeShifter(event.params.tokenId.toString());
    token.createdAtTimestamp = event.block.timestamp;
  
    let contract = MegaShapeShifterContract.bind(event.address);
    token.contentURI = contract.tokenURI(event.params.tokenId);
    token.type = contract.tokenTypes(event.params.tokenId);
  }
  token.megaShapeShifterOwner = event.params.to.toHexString();
  token.save();

  handleNewOwner(event.params.to.toHexString());
}

export function handleMegaShapeShiftersMinted(event: MegaShapeShiftersMintedEvent): void {
  let token = MegaShapeShifter.load(event.params.tokenId.toString());
  if (!token) {
    token = new MegaShapeShifter(event.params.tokenId.toString());
    token.createdAtTimestamp = event.block.timestamp;

    let contract = MegaShapeShifterContract.bind(event.address);
    token.contentURI = contract.tokenURI(event.params.tokenId);
    token.type = contract.tokenTypes(event.params.tokenId);
  }
  token.megaShapeShifterOwner = event.params.mintedBy.toHexString();
  token.save();

  handleNewOwner(event.params.mintedBy.toHexString());
}


function handleNewOwner(newOwnerAddress: string): void {
  let owner = Owner.load(newOwnerAddress);
  if (!owner) {
    owner = new Owner(newOwnerAddress);
    owner.save();
  }
}