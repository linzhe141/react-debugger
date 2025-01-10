const FLAG_TYPES = {
  // 0: 'NoFlags',
  1: 'PerformedWork',
  2: 'Placement',
  4: 'Update',
  16: 'ChildDeletion',
  32: 'ContentReset',
  64: 'Callback',
  128: 'DidCapture',
  256: 'ForceClientRender',
  512: 'Ref',
  1024: 'Snapshot',
  2048: 'Passive',
  4096: 'Hydrating',
  8192: 'Visibility',
  16384: 'StoreConsistency',
  32768: 'Incomplete',
  65536: 'ShouldCapture',
  131072: 'ForceUpdateForLegacySuspense',
  1048576: 'Forked',
  2097152: 'RefStatic',
  4194304: 'LayoutStatic',
  8388608: 'PassiveStatic',
  16777216: 'MountLayoutDev',
  33554432: 'MountPassiveDev',
  // Composite flags
  32767: 'HostEffectMask（）', // This is a bitmask of all mutation effects
  2104: 'LifecycleEffectMask', // Sum of Passive, Update, Callback, Ref, Snapshot, StoreConsistency
  1073741504: 'BeforeMutationMask', // Sum of Update, Snapshot, but since 0 is included, it's just Update | Snapshot
  16382: 'MutationMask', // Sum of Placement, Update, ChildDeletion, ContentReset, Ref, Hydrating, Visibility
  9216: 'LayoutMask', // Sum of Update, Callback, Ref, Visibility
  2064: 'PassiveMask', // Sum of Passive, ChildDeletion
  14680064: 'StaticMask', // Sum of LayoutStatic, PassiveStatic, RefStatic
}

function visualizeFlags(flags) {
  const result = []
  for (const [bit, type] of Object.entries(FLAG_TYPES)) {
    // Convert bit to integer for bitwise operations
    const flagValue = parseInt(bit)

    // Check if the flag is set in the flags parameter
    if ((flags & flagValue) === flagValue) {
      // Only add the flag if it matches exactly
      if (!result.includes(type)) {
        result.push(type)
      }
    }
  }
  return result
}

window.visualizeFlags = visualizeFlags
