package de.stustanet.stustapay.ui.topup

import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import de.stustanet.stustapay.ui.common.pay.ErrorScreen

@Composable
fun TopUpError(
    onDismiss: () -> Unit,
    viewModel: DepositViewModel
) {
    val status by viewModel.status.collectAsStateWithLifecycle()
    val topUpConfig by viewModel.topUpConfig.collectAsStateWithLifecycle()

    ErrorScreen(
        onDismiss = onDismiss,
        topBarTitle = topUpConfig.tillName,
    ) {
        Text(text = "Error in TopUp:", fontSize = 30.sp)
        Text(status, fontSize = 24.sp)
    }
}