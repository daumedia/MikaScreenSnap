// PermissionScreen.swift
// MikaScreenSnap
//
// Onboarding screen 2: Screen Recording permission request.
// Swift 6.0 strict concurrency, macOS 14+

import SwiftUI

/// Explains the Screen Recording permission, then hands the decision to the system.
///
/// The wording here is deliberately neutral. App Review rejected 3.6.0 under guideline
/// 5.1.1(iv) because the button ahead of the system prompt read *Grant Access* — a screen
/// that comes before the prompt may explain, it may not campaign. So the button says
/// *Continue*, a refusal ends in a plain statement of what stays unavailable, and System
/// Settings only opens when the user asks for it.
struct PermissionScreen: View {
    let preferences: AppPreferences
    let onNext: () -> Void

    @State private var granted = CGPreflightScreenCaptureAccess()
    /// The system has been asked and the answer was no — macOS will not ask a second time.
    @State private var declined = false
    @State private var autoAdvanceTask: Task<Void, Never>?

    private let timer = Timer.publish(every: 1, on: .main, in: .common).autoconnect()

    var body: some View {
        VStack(spacing: 24) {
            Spacer()

            if granted {
                Image(systemName: "checkmark.circle.fill")
                    .font(.system(size: 48))
                    .foregroundStyle(Color.green)
                    .transition(.scale.combined(with: .opacity))
            } else {
                Image(systemName: "lock.shield")
                    .font(.system(size: 48))
                    .foregroundStyle(Color.MikaPlus.tealPrimary)
            }

            Text("Screen Recording Permission")
                .font(.system(size: 20, weight: .semibold))
                .foregroundStyle(Color.MikaPlus.textPrimary)

            Text("Mika+ScreenSnap needs Screen Recording access to capture screenshots. Your data stays on your Mac — nothing is uploaded or shared.")
                .font(.system(size: 13))
                .foregroundStyle(Color.MikaPlus.textSecondary)
                .multilineTextAlignment(.center)
                .frame(maxWidth: 340)

            if !granted {
                if declined {
                    Text("Screen Recording is turned off, so capturing stays unavailable. It can be turned on in System Settings at any time.")
                        .font(.system(size: 12))
                        .foregroundStyle(Color.MikaPlus.textSecondary)
                        .multilineTextAlignment(.center)
                        .frame(maxWidth: 340)

                    Button("Open System Settings") {
                        openSettings()
                    }
                    .buttonStyle(.bordered)

                    Button {
                        onNext()
                    } label: {
                        primaryLabel("Continue")
                    }
                    .buttonStyle(.plain)
                } else {
                    Button {
                        requestAccess()
                    } label: {
                        primaryLabel("Continue")
                    }
                    .buttonStyle(.plain)
                }
            }

            Spacer()

            if !granted && !declined {
                Button("Skip for now") {
                    onNext()
                }
                .buttonStyle(.plain)
                .font(.system(size: 12))
                .foregroundStyle(Color.MikaPlus.tealLight.opacity(0.5))
            }

            Spacer()
                .frame(height: 20)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .animation(.easeInOut, value: granted)
        .animation(.easeInOut, value: declined)
        .onReceive(timer) { _ in
            let status = CGPreflightScreenCaptureAccess()
            if status && !granted {
                granted = true
                autoAdvanceTask = Task { @MainActor in
                    try? await Task.sleep(for: .seconds(1))
                    if !Task.isCancelled {
                        onNext()
                    }
                }
            }
        }
        .onDisappear {
            autoAdvanceTask?.cancel()
        }
    }

    private func primaryLabel(_ title: String) -> some View {
        Text(title)
            .font(.system(size: 14, weight: .medium))
            .foregroundStyle(.white)
            .frame(width: 200, height: 40)
            .background(Color.MikaPlus.tealPrimary)
            .clipShape(RoundedRectangle(cornerRadius: 8))
    }

    /// Asks the system for the permission and leaves the answer alone.
    ///
    /// Only ever preflighting the permission meant the system never listed the app, so a
    /// user looking for it could arrive at a Screen Recording list the app was not in yet.
    /// `CGRequestScreenCaptureAccess` registers it and shows the system prompt. A refusal
    /// is not answered by opening System Settings unasked — the screen states what this
    /// costs and offers the way there for whoever wants it.
    private func requestAccess() {
        Task {
            let granted = await Task.detached { CGRequestScreenCaptureAccess() }.value
            if granted {
                self.granted = true
            } else {
                self.declined = true
            }
        }
    }

    private func openSettings() {
        if let url = URL(string: "x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture") {
            NSWorkspace.shared.open(url)
        }
    }
}
