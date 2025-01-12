package de.stustanet.stustapay.ui.common.pay


import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Button
import androidx.compose.material.ButtonDefaults
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.hapticfeedback.HapticFeedbackType
import androidx.compose.ui.platform.LocalHapticFeedback
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import de.stustanet.stustapay.ui.theme.errorButtonColors


@Preview
@Composable
fun PreviewSelectionItem() {
    ProductSelectionItem(
        itemPrice = "13,37",
        itemAmount = "12",
        leftButtonText = "Robbenfutter",
        rightButtonText = "-",
    )
}


/**
 * Item with increment and decrement buttons.
 */
@Composable
fun ProductSelectionItem(
    itemPrice: String,
    itemAmount: String? = null,
    itemAmountDelimiter: String = "×",
    leftButtonText: String,
    leftButtonFontSize: TextUnit = 24.sp,
    rightButtonText: String = "‒",
    rightButtonFontSize: TextUnit = 40.sp,
    leftButtonPress: () -> Unit = {},
    rightButtonPress: () -> Unit = {},
    sameSizeButtons: Boolean = false,
) {
    val haptic = LocalHapticFeedback.current

    Row(
        horizontalArrangement = Arrangement.SpaceEvenly,
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier
                .weight(0.3f)
                .padding(end = 6.dp),
            horizontalArrangement = Arrangement.End,
        ) {
            // TODO: highlight background if not 0

            Text(
                text = itemPrice,
                textAlign = TextAlign.Right,
                modifier = Modifier.weight(0.6f),
                fontSize = 24.sp,
            )

            Text(
                text = if (itemAmount != null) "${itemAmountDelimiter}${itemAmount}" else "",
                textAlign = TextAlign.Right,
                modifier = Modifier.weight(0.4f),
                fontSize = 24.sp,
            )
        }

        Box(
            modifier = Modifier
                .weight(0.7f)
                .padding(vertical = 3.dp)
                .height(74.dp)
        ) {
            Row(
                horizontalArrangement = Arrangement.SpaceEvenly,
                modifier = Modifier.fillMaxSize(),
            ) {
                Button(
                    onClick = {
                        haptic.performHapticFeedback(HapticFeedbackType.LongPress)
                        leftButtonPress()
                    },
                    modifier = Modifier
                        .fillMaxWidth(
                            if (sameSizeButtons) {
                                0.6f
                            } else {
                                0.7f
                            }
                        )
                        .fillMaxHeight()
                ) {
                    Text(text = leftButtonText, fontSize = leftButtonFontSize)
                }
                Spacer(modifier = Modifier.padding(horizontal = 2.dp))

                Button(
                    onClick = {
                        haptic.performHapticFeedback(HapticFeedbackType.LongPress)
                        rightButtonPress()
                    },
                    modifier = Modifier
                        .fillMaxSize(),
                    colors = if (sameSizeButtons) {
                        ButtonDefaults.buttonColors()
                    } else {
                        errorButtonColors()
                    }
                ) {
                    Text(
                        text = rightButtonText,
                        fontSize = rightButtonFontSize,
                    )
                }
            }
        }
    }
}
